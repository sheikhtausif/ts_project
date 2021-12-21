/// <reference path="base_component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/drag_drop.ts" />
/// <reference path="../models/project.ts" />

namespace App {
    // ProjectItem class
    export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {

        private project: Project;

        get persons() {
            if (this.project.people === 1) return '1 Person';
            else return this.project.people + ' Persons';
        }

        constructor(hostId: string, project: Project) {
            super('single-project', hostId, false, project.id);
            this.project = project;

            this.configure();
            this.renderContent();
        }

        renderContent() {
            this.element.querySelector('h2')!.textContent = this.project.title;
            this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
            this.element.querySelector('p')!.textContent = this.project.description;
        }

        @Autobind
        dragStartHandler(event: DragEvent) {
            event.dataTransfer!.setData('text/plain', this.project.id);
            event.dataTransfer!.effectAllowed = 'move';

        }
        dragEndHandler(_: DragEvent): void { }

        configure() {
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragend', this.dragEndHandler);
        }

    }
}