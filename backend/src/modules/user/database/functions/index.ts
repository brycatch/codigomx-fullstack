import { User as Model } from '../models/';
import { IUser } from '../interfaces/IUser';
import { encryptString } from '../../utils';

const USER_COUNT_PROPERTIES = 5;
const USER_MAX_COUNT_PROPERTIES = 7;

const get = async (userId: string): Promise<IUser | null> => {
  try {
    const user = await Model.findOne({
      where: { userId },
      attributes: { exclude: ['password'] },
    });
    if (user === null) throw new Error(`User ${userId} not found`);
    const result: IUser = { ...user.toJSON() };
    return Promise.resolve(result);
  } catch (error) {
    return Promise.resolve(null);
  }
};

const create = async (user: IUser): Promise<Partial<IUser> | null> => {
  try {
    validateUser(user, true);
    user.password = await encryptString(user.password);
    let result = (await Model.create(user)).toJSON();
    result = { ...result, password: '' };
    return Promise.resolve(result);
  } catch (error) {
    return Promise.resolve(null);
  }
};

const list = async (): Promise<IUser[]> => {
  try {
    const users = (
      await Model.findAll({
        where: { isActive: true },
        attributes: { exclude: ['password'] },
      })
    ).map((item) => item.get({ plain: true }));
    return Promise.resolve(users);
  } catch (error) {
    return Promise.resolve([]);
  }
};

const update = async (userId: string, user: Partial<IUser>) => {
  try {
    validateUser(user, false);
    const rowsUpdated = await Model.update(user, { where: { userId } });
    const updated = rowsUpdated['0'] === 1;
    return Promise.resolve(updated);
  } catch (error) {
    return Promise.resolve(false);
  }
};

const remove = async (userId: string) => {
  try {
    const rowsDeleted = await Model.update(
      { isActive: false },
      { where: { userId, isActive: true } }
    );
    const deleted = rowsDeleted['0'] === 1;
    return Promise.resolve(deleted);
  } catch (error) {
    return Promise.resolve(false);
  }
};

const validateUser = (
  user: Partial<IUser>,
  allProperties: boolean = true
): boolean => {
  const keys = Object.getOwnPropertyNames(user);

  if (allProperties) {
    const hasAllProperties =
      keys.length >= USER_COUNT_PROPERTIES &&
      keys.length <= USER_MAX_COUNT_PROPERTIES;
    if (!hasAllProperties)
      throw new Error(`User doesn't have all properties requiered`);
  }

  keys.forEach((key) => {
    switch (key) {
      case 'gender':
        validateNumber(user[key]);
        break;
      case 'firstName':
      case 'lastName':
      case 'password':
        validateString(user[key]);
        break;
      case 'birthday':
        validateDate(user[key]);
    }
  });

  return true;
};

const validateNumber = (value: unknown) => {
  const isNan = Number.isNaN(value);
  const isNegative = Number(value) && Number(value) < 0;
  if (isNan) throw new Error(`Number ${value} is not a number`);
  if (isNegative) throw new Error(`Number ${value} is not valid`);
};

const validateString = (value: unknown) => {
  const isString = typeof value === 'string';
  if (!isString) throw new Error(`${value} is not a string`);

  const isValidString = value !== '' && value.length > 0;
  if (!isValidString) throw new Error(`${value} is not a valid string`);
};

const validateDate = (value: any) => {
  const isNotDate = Number.isNaN(new Date(value).getTime());
  if (isNotDate) throw new Error(`${value} is not a date`);
};

export default { get, create, list, update, remove };
