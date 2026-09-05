export interface Credentials {
  username: string;
  password: string;
}

export const usuarios = {
  invalido: {
    username: "usuario_invalido",
    password: "password_invalido",
  } as Credentials,

  valido: {
    username: "tomsmith",
    password: "SuperSecretPassword!",
  } as Credentials,
};
