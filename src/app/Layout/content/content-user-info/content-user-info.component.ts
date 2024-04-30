import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-content-user-info',
    standalone: true,
    imports: [SpeedDialModule, ToastModule],
    templateUrl: './content-user-info.component.html',
    styleUrl: './content-user-info.component.scss'
})
export class ContentUserInfoComponent implements OnInit {
    items!: MenuItem[] | null;

    constructor(private messageService: MessageService) { }
    ngOnInit(): void {
        this.items = [
            {
                icon: 'pi pi-pencil',
                style: { "font-size": "2.5rem" },

                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
            {
                style: { 'color': 'green;' },
                icon: 'pi pi-pencil',
              //  icon: 'pi pi-refresh',
                 command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
                }
            },
            {
                icon: 'pi pi-trash',
                visible: false,
                iconClass: "color",
                command: () => {
                    this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                }
            },
            {
                icon: 'pi pi-upload',
                iconClass: "color",
                routerLink: ['/fileupload']
            },
            {
                icon: 'pi pi-external-link',
                target: '_blank',
                iconClass: "color",
                url: 'http://angular.io'
            }
        ];
    }

}
