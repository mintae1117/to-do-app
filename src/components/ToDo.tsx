import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const categories = useRecoilValue<string[]>(categoriesState);
    const onClick = (newCategory: IToDo["category"]) => {
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            const newToDo = { text, id, category: newCategory };
            return [
                ...oldToDos.slice(0, targetIndex),
                newToDo,
                ...oldToDos.slice(targetIndex + 1),
            ];
        });
    };

    return (
        <div>
            <ul>
                <div>
                <span>{text}</span>
                <div>
                {categories.map((props) => (
                <button key={props} onClick={() => onClick(props)} disabled={category === props}>
                {props}
                </button>
                ))}
                </div>
                </div>
            </ul>
        </div>
    );
}

export default ToDo;
