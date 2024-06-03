export const ADD_DATA = 'ADD_DATA';
export const REMOVE_DATA = 'REMOVE_DATA';

export const addata = (data:string) => ({
  type: ADD_DATA,
  payload: data,
});

export const removedata = () => ({
  type: REMOVE_DATA,
  payload: "",
  
});

export interface PostsState {
  authstatus: boolean;
  acesstoken: string;
}

export interface RootState {
  posts: PostsState;
}