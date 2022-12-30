import { randomUUID } from "crypto";
import { GenericResource } from "../types/generic";

type UserData = {
  email: string,
  name: string,
  password: string,
  createdAt: string,
  updatedAt: string
};

export default class User implements GenericResource<UserData> {
  public id: string;

  constructor(public data: UserData) {
    this.id = randomUUID();
  };
}