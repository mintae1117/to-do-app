import { useRecoilValue } from "recoil";
import { categoryState, toDoSelector } from "../atoms";
import CategorySelctor from "./CategorySelector";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";

const Biggerh1 = styled.h1`
  font-size: 30px;
`;
const Colorspan = styled.span`
  color: tomato;
`;

function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const category = useRecoilValue(categoryState);

    return (
      <div>
        <CategorySelctor />
        <div>
          <div>
            <Biggerh1><Colorspan>{category}</Colorspan> Category</Biggerh1>
            <CreateToDo />
            {toDos?.map((toDo) => (
                <ToDo key={toDo.id} {...toDo} />
            ))}
          </div>
        </div>
      </div>
    );
}

export default ToDoList;
