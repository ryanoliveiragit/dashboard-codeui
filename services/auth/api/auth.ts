import Cookies from 'js-cookie';
import instance from './instance';

export const login = async (email: string, password: string, router: any): Promise<string> => {
  try {
    const response = await instance.post('/session', {
      email,
      password,
    });

    const token = response.data.accessToken;

    Cookies.set('auth_token', token, { expires: 7 });
    router.push('/');

    return token;
  } catch (error) {
    throw new Error('Erro ao fazer login');
  }
};
