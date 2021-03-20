import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ProductNotFoundException } from 'src/Domain/Product/Exception/ProductNotFoundException';
import { Product } from 'src/Domain/Product/Product.entity';
import { IProductRepository } from 'src/Domain/Product/Repository/IProductRepository';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { SchoolProductAlreadyExistException } from 'src/Domain/School/Exception/SchoolProductAlreadyExistException';
import { ISchoolProductRepository } from 'src/Domain/School/Repository/ISchoolProductRepository';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { School } from 'src/Domain/School/School.entity';
import { SchoolProduct } from 'src/Domain/School/SchoolProduct.entity';
import { IsSchoolProductAlreadyExist } from 'src/Domain/School/Specification/Product/IsSchoolProductAlreadyExist';
import { CreateSchoolProductCommand } from './CreateSchoolProductCommand';

@CommandHandler(CreateSchoolProductCommand)
export class CreateSchoolProductCommandHandler {
  constructor(
    @Inject('ISchoolRepository')
    private readonly schoolRepository: ISchoolRepository,
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    @Inject('ISchoolProductRepository')
    private readonly schoolProductRepository: ISchoolProductRepository,
    private readonly isSchoolProductAlreadyExist: IsSchoolProductAlreadyExist,
  ) {}

  public async execute(command: CreateSchoolProductCommand): Promise<string> {
    const { parentUnitPrice, userUnitPrice, schoolId, productId } = command;

    const [ school, product ] = await Promise.all([
      this.getSchool(schoolId),
      this.getProduct(productId)
    ]);

    if (true === (await this.isSchoolProductAlreadyExist.isSatisfiedBy(school, product))) {
      throw new SchoolProductAlreadyExistException();
    }

    const schoolProduct = await this.schoolProductRepository.save(
      new SchoolProduct(
        Math.round(parentUnitPrice * 100),
        Math.round(userUnitPrice * 100),
        school,
        product
      )
    );

    return schoolProduct.getId();
  }

  private async getProduct(productId: string): Promise<Product> {
    const product = await this.productRepository.findOneById(productId);
    if (!product) {
      throw new ProductNotFoundException();
    }

    return product;
  }

  private async getSchool(schoolId: string): Promise<School> {
    const school = await this.schoolRepository.findOneById(schoolId);
    if (!school) {
      throw new SchoolNotFoundException();
    }

    return school;
  }
}
