import { addCandidate } from '../application/services/candidateService';
import { Candidate } from '../domain/models/Candidate';

jest.mock('../domain/models/Education');
jest.mock('../domain/models/WorkExperience');
jest.mock('../domain/models/Resume');

describe('addCandidate - Validation Tests', () => {
  let saveMock: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    saveMock = jest
      .spyOn(Candidate.prototype, 'save')
      .mockImplementation(jest.fn());
  });

  afterEach(() => {
    saveMock.mockRestore();
  });

  it('Debería lanzar un error si falta el campo firstName', async () => {
    const candidateData = {
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };

    await expect(addCandidate(candidateData as Candidate)).rejects.toThrow(
      'El campo firstName es obligatorio',
    );
  });

  it('Debería lanzar un error si falta el campo lastName', async () => {
    const candidateData = {
      firstName: 'John',
      email: 'john.doe@example.com',
    };

    await expect(addCandidate(candidateData as Candidate)).rejects.toThrow(
      'El campo lastName es obligatorio',
    );
  });

  it('Debería lanzar un error si falta el campo email', async () => {
    const candidateData = {
      firstName: 'John',
      lastName: 'Doe',
    };

    await expect(addCandidate(candidateData as Candidate)).rejects.toThrow(
      'El campo email es obligatorio',
    );
  });

  it('Debería lanzar un error si el campo email tiene un formato incorrecto', async () => {
    const candidateData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@com',
    };

    await expect(addCandidate(candidateData as Candidate)).rejects.toThrow(
      'El campo email tiene un formato incorrecto',
    );
  });

  it('Debería lanzar un error si el campo phone tiene un formato incorrecto', async () => {
    const candidateData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
    };

    await expect(addCandidate(candidateData as Candidate)).rejects.toThrow(
      'El campo phone tiene un formato incorrecto',
    );
  });

  it('Debería lanzar un error si el campo address excede la longitud permitida', async () => {
    const candidateData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      address: 'a'.repeat(101),
    };

    await expect(addCandidate(candidateData as Candidate)).rejects.toThrow(
      'El campo address excede la longitud permitida',
    );
  });

  it('Debería lanzar un error si el campo education tiene una institución con longitud incorrecta', async () => {
    const candidateData = new Candidate({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      education: [{ institution: '', title: 'B.Sc', startDate: '2020-01-01' }],
    });

    await expect(addCandidate(candidateData)).rejects.toThrow(
      'El campo institution tiene una longitud incorrecta',
    );
  });

  it('Debería lanzar un error si el campo education tiene un título con longitud incorrecta', async () => {
    const candidateData = new Candidate({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      education: [
        { institution: 'University', title: '', startDate: '2020-01-01' },
      ],
    });

    await expect(addCandidate(candidateData as Candidate)).rejects.toThrow(
      'El campo title tiene una longitud incorrecta',
    );
  });

  it('Debería lanzar un error si el campo education tiene una fecha de inicio con formato incorrecto', async () => {
    const candidateData = new Candidate({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      education: [
        { institution: 'University', title: 'B.Sc', startDate: 'invalid-date' },
      ],
    });

    await expect(addCandidate(candidateData as Candidate)).rejects.toThrow(
      'El campo startDate tiene un formato incorrecto',
    );
  });

  it('Debería lanzar un error si el campo education tiene una fecha de fin con formato incorrecto', async () => {
    const candidateData = new Candidate({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      education: [
        {
          institution: 'University',
          title: 'B.Sc',
          startDate: '2020-01-01',
          endDate: 'invalid-date',
        },
      ],
    });

    await expect(addCandidate(candidateData as Candidate)).rejects.toThrow(
      'El campo endDate tiene un formato incorrecto',
    );
  });

  it('Debería lanzar un error si el campo workExperience tiene una compañía con longitud incorrecta', async () => {
    const candidateData = new Candidate({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      workExperience: [
        { company: '', position: 'Developer', startDate: '2020-01-01' },
      ],
    });

    await expect(addCandidate(candidateData as Candidate)).rejects.toThrow(
      'El campo company tiene una longitud incorrecta',
    );
  });

  it('Debería lanzar un error si el campo workExperience tiene una posición con longitud incorrecta', async () => {
    const candidateData = new Candidate({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      workExperience: [
        { company: 'Company', position: '', startDate: '2020-01-01' },
      ],
    });

    await expect(addCandidate(candidateData as Candidate)).rejects.toThrow(
      'El campo position tiene una longitud incorrecta',
    );
  });

  it('Debería lanzar un error si el campo workExperience tiene una descripción con longitud incorrecta', async () => {
    const candidateData = new Candidate({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      workExperience: [
        {
          company: 'Company',
          position: 'Developer',
          description: '',
          startDate: '2020-01-01',
        },
      ],
    });

    await expect(addCandidate(candidateData as Candidate)).rejects.toThrow(
      'El campo description tiene una longitud incorrecta',
    );
  });

  it('Debería lanzar un error si el campo workExperience tiene una fecha de inicio con formato incorrecto', async () => {
    const candidateData = new Candidate({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      workExperience: [
        {
          company: 'Company',
          position: 'Developer',
          startDate: 'invalid-date',
        },
      ],
    });

    await expect(addCandidate(candidateData as Candidate)).rejects.toThrow(
      'El campo startDate tiene un formato incorrecto',
    );
  });

  it('Debería lanzar un error si el campo workExperience tiene una fecha de fin con formato incorrecto', async () => {
    const candidateData = new Candidate({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      workExperience: [
        {
          company: 'Company',
          position: 'Developer',
          startDate: '2020-01-01',
          endDate: 'invalid-date',
        },
      ],
    });

    await expect(addCandidate(candidateData as Candidate)).rejects.toThrow(
      'El campo endDate tiene un formato incorrecto',
    );
  });

  it('Debería lanzar un error si el campo cv tiene datos incorrectos', async () => {
    const candidateData = new Candidate({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      cv: { filePath: '', fileType: 'pdf' },
    });

    await expect(addCandidate(candidateData as Candidate)).rejects.toThrow(
      'El campo cv tiene datos incorrectos',
    );
  });

  it('Debería insertar un candidato exitosamente con todos los campos válidos', async () => {
    const candidateData = new Candidate({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St',
      education: [
        {
          institution: 'University',
          title: 'Bachelor',
          startDate: new Date('2010-01-01T23:00:00.000Z'),
          endDate: new Date('2014-01-01T23:00:00.000Z'),
        },
      ],
      workExperience: [
        {
          company: 'Company',
          position: 'Developer',
          description: 'Developed software',
          startDate: new Date('2014-01-01T23:00:00.000Z'),
          endDate: new Date('2018-01-01T23:00:00.000Z'),
        },
      ],
      cv: 'link-to-cv',
    });

    const savedCandidate = {
      id: 1,
      ...candidateData,
      education: [],
      workExperience: [],
      resumes: [],
    };
    saveMock.mockResolvedValue(savedCandidate);

    const result = await addCandidate(candidateData as Candidate);

    expect(Candidate.prototype.save).toHaveBeenCalled();
    expect(result).toEqual(savedCandidate);
  });

  it('Debería insertar un candidato exitosamente sin campos opcionales', async () => {
    const candidateData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };

    const savedCandidate = {
      id: 1,
      ...candidateData,
      education: [],
      workExperience: [],
      resumes: [],
    };
    saveMock.mockResolvedValue(savedCandidate);

    const result = await addCandidate(candidateData as Candidate);

    expect(Candidate.prototype.save).toHaveBeenCalled();
    expect(result).toEqual(savedCandidate);
  });

  it('Debería lanzar un error si el email ya existe en la base de datos', async () => {
    const candidateData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };

    saveMock.mockImplementation(() => {
      const error = new Error(
        'Unique constraint failed on the fields: (`email`)',
      );
      (error as any).code = 'P2002';
      throw error;
    });

    await expect(addCandidate(candidateData as Candidate)).rejects.toThrow(
      'El email ya existe en la base de datos',
    );
  });

  it('Debería lanzar un error si ocurre un error inesperado en la base de datos durante la inserción', async () => {
    const candidateData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };

    saveMock.mockImplementation(() => {
      throw new Error('Unexpected database error');
    });

    await expect(addCandidate(candidateData as Candidate)).rejects.toThrow(
      'Unexpected database error',
    );
  });
});
