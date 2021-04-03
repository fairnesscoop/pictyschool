import { CodeGeneratorAdapter } from './CodeGeneratorAdapter';

describe('CodeGeneratorAdapter', () => {
  it('testGenerate', () => {
    const codeGenerator = new CodeGeneratorAdapter();
    expect(codeGenerator.generate()).toBeDefined();
  });
});
