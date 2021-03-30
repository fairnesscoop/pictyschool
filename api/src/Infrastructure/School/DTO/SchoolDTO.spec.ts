import { SchoolDTO } from './SchoolDTO';
import { validate } from 'class-validator';
import { Status, Type } from 'src/Domain/School/AbstractSchool';

describe('SchoolDTO', () => {
  it('testValidDTO', async () => {
    const dto = new SchoolDTO();
    dto.reference = 'xLKJs';
    dto.address = '127 rue Bélliard';
    dto.city = 'Paris';
    dto.zipCode = '75018';
    dto.name = 'Ecole élémentaire';
    dto.pdv = '2019-12-19T11:20:04.568Z';
    dto.numberOfClasses = 10;
    dto.numberOfStudents = 10;
    dto.observation = 'observation';
    dto.phoneNumber = '010101010101';
    dto.type = Type.ELEMENTARY;
    dto.status = Status.PRIVATE;

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new SchoolDTO();
    dto.reference = 'xLKJs';
    dto.address = '127 rue Bélliard';
    dto.city = 'Paris';
    dto.zipCode = '75018';
    dto.name = 'Ecole élémentaire';
    dto.pdv = '2019';
    dto.numberOfClasses = 10;
    dto.numberOfStudents = 10;
    dto.observation = 'observation';
    dto.phoneNumber = '010101010101';
    dto.type = Type.ELEMENTARY;
    dto.status = Status.PRIVATE;

    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
    expect(validation[0].constraints).toMatchObject({
      isDateString: "pdv must be a ISOString"
    });
  });

  it('testEmptyDTO', async () => {
    const dto = new SchoolDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(7);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: "reference should not be empty"
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: "name should not be empty"
    });
    expect(validation[2].constraints).toMatchObject({
      isNotEmpty: "address should not be empty"
    });
    expect(validation[3].constraints).toMatchObject({
      isNotEmpty: "city should not be empty"
    });
    expect(validation[4].constraints).toMatchObject({
      isNotEmpty: "zipCode should not be empty",
      maxLength: "zipCode must be shorter than or equal to 6 characters"
    });
    expect(validation[5].constraints).toMatchObject({
      isEnum: "status must be a valid enum value",
      isNotEmpty: "status should not be empty"
    });
    expect(validation[6].constraints).toMatchObject({
      isEnum: "type must be a valid enum value",
      isNotEmpty: "type should not be empty"
    });
  });
});
