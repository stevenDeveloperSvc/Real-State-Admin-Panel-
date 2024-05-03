import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SpeedDialModule } from 'primeng/speeddial';
import { UserInfoService } from '../../../services/user-info.service';
import { UserInfo } from '../../../interface/Content';

@Component({
    selector: 'app-content-user-info',
    standalone: true,
    imports: [SpeedDialModule],
    templateUrl: './content-user-info.component.html',
    styleUrl: './content-user-info.component.scss'
})


export class ContentUserInfoComponent implements OnInit {
    items!: MenuItem[] | null;
    user!: UserInfo
    ImageURL: string | null = '';
    value: any;


    constructor(private messageService: MessageService, private userInfo: UserInfoService) { }
    
    ngOnInit(): void {
        this.LoadItems();
        this.LoadUserData();
    }
    private LoadUserData() {
        this.userInfo.GetUserInfoByRequest().subscribe({
            next: ({ userInfo }) => {
               this.user = {
                    ocupation: userInfo.ocupation,
                    description : userInfo.description,
                    ocupationId: userInfo.ocupationId,
                    firstname :  userInfo.firstname,
                    lastname : userInfo.lastname,
                    imageurl : userInfo.image,
                    phone : userInfo.phone,
                    email: userInfo.email,
                    username: userInfo.username
                }

                console.log(userInfo)
            },
            error: (value) => {

            }
        });
    }
    private LoadItems() {
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
