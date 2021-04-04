import { Injectable } from '@nestjs/common';
import * as shortid from 'shortid';
import { ICodeGenerator } from 'src/Application/ICodeGenerator';

@Injectable()
export class CodeGeneratorAdapter implements ICodeGenerator {
  public generate(): string {
    return shortid.generate();
  }
}
