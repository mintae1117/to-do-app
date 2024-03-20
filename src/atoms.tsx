import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

/*
export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
}*/
let Categories = ["To Do", "Doing", "Done"];


export interface IToDo {
  text: string;
  id: number;
  category: string;
}

const { persistAtom } = recoilPersist();

export const categoryState = atom({
    key: "category",
    default: Categories[0],
});
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const categoriesState = atom<string[]>({
    key: "categories",
    default: Categories,
    effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    },
});