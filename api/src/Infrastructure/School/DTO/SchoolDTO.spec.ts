import { SchoolDTO } from './SchoolDTO';
import { validate } from 'class-validator';
import { Civility } from 'src/Domain/School/School.entity';

describe('SchoolDTO', () => {
  it('testValidDTO', async () => {
    const dto = new SchoolDTO();
    dto.reference = 'xLKJs';
    dto.address = '127 rue Bélliard';
    dto.city = 'Paris';
    dto.zipCode = '75018';
    dto.name = 'Ecole élémentaire';
    dto.schoolTypeId = 'df8910f9-ac0a-412b-b9a8-dbf299340abc';
    dto.pdv = '2019-12-19T11:20:04.568Z';
    dto.director = 'director';
    dto.directorCivility = Civility.MME;
    dto.email = 'mail@mail.com';
    dto.numberOfClasses = 10;
    dto.numberOfStudents = 10;
    dto.observation = 'observation';
    dto.phoneNumber = '010101010101';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testEmptyDTO', async () => {
    const dto = new SchoolDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(6);
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
      isNotEmpty: "schoolTypeId should not be empty", 
      isUuid: "schoolTypeId must be an UUID"
    });
  });

  it('testInvalidDTO', async () => {
    const dto = new SchoolDTO();
    dto.reference = 'xLKJs';
    dto.address = '127 rue Bélliard';
    dto.city = 'Paris';
    dto.zipCode = '75018';
    dto.name = 'Ecole élémentaire';
    dto.schoolTypeId = 'df8910f9-ac0a-412b-b9a8-dbf299340abc';
    dto.pdv = 'date';
    dto.email = 'mail';

    const validation = await validate(dto);
    expect(validation).toHaveLength(2);
    expect(validation[0].constraints).toMatchObject({
      isEmail: "email must be an email"
    });
    expect(validation[1].constraints).toMatchObject({
      isDateString: "pdv must be a ISOString"
    });
  });
});
