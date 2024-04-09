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

const TodoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const category = useRecoilValue(categoryState);

    return (
      <TodoWrapper>
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
      </TodoWrapper>
    );
}

export default ToDoList;
