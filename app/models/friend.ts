import { Model } from 'objection';

export default class Friend extends Model {
  public id!: number;
  public firstName!: string;
  public address!: string; // This comes from emails

  static get tableName() {
    return 'friends';
  }
}