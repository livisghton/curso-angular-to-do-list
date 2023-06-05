import { Component, DoCheck } from '@angular/core';

//Interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || "[]");
  
  constructor() {}

  ngDoCheck(): void {
    this.setLocalStorage();
  }

  /**
   * Remove um elemento do array com base em seu index
   * 
   * @param event posição do elemento no array
   */
  public deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1);
  }

  /**
   * Remove todos os elementos do array
   */
  public deleteAllTaskList() {
    const confirm = window.confirm("Você deseja realmente Deletar tudo?");

    if(confirm) {
      this.taskList = [];
    }
  }

  /**
   * Pega o valor emitido pelo componente filho e adiciona a lista
   * 
   * @param event novo item
   */
  public setEmitItemTaskList(event: string) {
    this.taskList.push({ task: event, checked: false });
  }

  /**
   * Valida a edição de uma task.
   * 
   * @param event nome da task
   * @param index index da task
   */
  public validationInput(event: string, index: number) {

    if(!event.length) {
      const confirm = window.confirm("Task está vazia, deseja Deletar?");

      if (confirm) {
        this.deleteItemTaskList(index);
      }
    }
  }

  public setLocalStorage() {

    if(this.taskList) {
      this.taskList.sort( (first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }

}
