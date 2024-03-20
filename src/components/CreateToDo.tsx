import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IForm>();

    const handleValid = ({ toDo }: IForm) => {
        setToDos((oldToDos) => [
            ...oldToDos,
            { text: toDo, id: Date.now(), category },
        ]);
        setValue("toDo", "");
    };

    return (
        <div>
            <form onSubmit={handleSubmit(handleValid)}>
                <div>
                    <input
                        {...register("toDo", {
                            required: "Please write To Do",
                        })}
                        placeholder={`Write ${category}`}
                    />
                    <button>add</button>
                </div>
                <div>
                    <p>{errors?.toDo?.message}</p>
                </div>
            </form>
        </div>
    );
}

export default CreateToDo;
