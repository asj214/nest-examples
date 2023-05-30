import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async findDepth(parentId: number) {
    if (!parentId) return null
    const parent = await this.categoryRepository.findOneBy({ id: parentId });
    return parent.depth + 1
  }

  generateTree(rows: Category[], parentId: number = null, depth: number = 0) {
    const ret = [];
    for (const i in rows) {
      if (rows[i].depth != depth || parentId != rows[i].parentId) continue
      ret.push({
        id: rows[i].id,
        parentId: rows[i].parentId,
        name: rows[i].name,
        depth: rows[i].depth,
        order: rows[i].order,
        path: rows[i].path,
        createdAt: rows[i].createdAt,
        updatedAt: rows[i].updatedAt,
        children: this.generateTree(rows, rows[i].id, rows[i].depth + 1)
      });
    }
    return ret;
  }

  async setCategoryPath() {
    const categories = await this.categoryRepository.find();
    for (const i in categories) {
      const path = await this.findChildren(categories[i].id);
      await this.categoryRepository.update(categories[i].id, {
        path: path
      });
    }
  }

  async findChildren(id: number) {
    let ret = [id];
    const categories = await this.categoryRepository.findBy({
      parentId: id
    });

    for (const i in categories) {
      const child = await this.findChildren(categories[i].id)
      ret = [...ret, ...child]
    }

    return ret
  }

  async create(user, dto: CreateCategoryDto) {
    const category = new Category();
    category.parentId = dto.parentId;
    category.name = dto.name;
    category.depth = await this.findDepth(dto.parentId);
    category.order = dto.order;
    category.user = user;
    category.path = [];

    const ret = await this.categoryRepository.save(category);

    this.setCategoryPath();

    return ret
  }

  async findAll() {
    const categories = await this.categoryRepository.find({
      order: {
        depth: 'ASC',
        order: 'ASC'
      }
    });

    return this.generateTree(categories)
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) throw new NotFoundException();
    return category
  }

  async update(id: number, dto: UpdateCategoryDto) {
    await this.categoryRepository.update(id, dto);
    this.setCategoryPath();
    return await this.findOne(id);
  }

  async remove(id: number) {
    return await this.categoryRepository.softDelete({ id: id });
  }
}
