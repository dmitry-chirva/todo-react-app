import { getUniqId } from "../shared/utils/string.utils";

export class TodoFactoryService {
    static createTodo(name) {
        const id = getUniqId();
        const isCompleted = false;

        return {
            id,
            name,
            isCompleted
        }
    }

    static defaultTodo() {
        return {
            id: null,
            name: '',
            isCompleted: false
        }
    }
}