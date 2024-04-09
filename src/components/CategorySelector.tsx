import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { categoriesState, categoryState } from "../atoms";

const CategoryDiv = styled.div`
    width: 100%;
    color: whitesmoke;
    cursor: pointer;
    &:hover {
        color: tomato;
    }
`;

interface IForm {
    category: string;
}

function CategorySelctor() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IForm>();

    const setCategory = useSetRecoilState(categoryState);
    const [categories, setCategories] = useRecoilState<string[]>(categoriesState);

    const handleValid = ({ category }: IForm) => {
        setCategories((oldCategory) => [
            ...oldCategory,
            category,
        ]);
        setValue("category", "");
    };

    const onClick = (category: string) => {
        setCategory(category);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(handleValid)}>
                <div>
                    <input
                        {...register("category", {
                            required: "Please write Category",
                        })}
                        placeholder="Add Category"
                    />
                    <button>add</button>
                </div>
                <div>
                    <p>{errors?.category?.message}</p>
                </div>
            </form>
            <div>
                {categories?.map((category) => (
                    <div key={category}>
                        <CategoryDiv key={category} onClick={() => onClick(category)} >
                            {category}
                        </CategoryDiv>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategorySelctor;
