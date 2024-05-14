import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SpeedDialModule } from 'primeng/speeddial';
import { UserInfoService } from '../../../services/user-info.service';
import { Ocupation, UserInfo } from '../../../interface/Content';
import { DropdownModule } from 'primeng/dropdown';
import { OcupationService } from '../../../services/ocupation.service';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-content-user-info',
    standalone: true,
    imports: [SpeedDialModule, DropdownModule, ReactiveFormsModule, FormsModule],
    templateUrl: './content-user-info.component.html',
    styleUrl: './content-user-info.component.scss'
})


export class ContentUserInfoComponent implements OnInit {
    IsDisabled: any;

    items!: MenuItem[] | null;
    Ocupations!: any[] | Ocupation[];
    Ocupation: Ocupation | undefined;
    value: any;

    user: UserInfo = {
        firstname: '',
        lastname: '',
        ocupation: '',
        ocupationId: 0,
        description: '',
        imageurl: '',
        phone: '',
        email: '',
        username: ''
    }

    
    constructor(private messageService: MessageService,
        private userInfo: UserInfoService,
        private formBuilder : FormBuilder,
        private OcupationService: OcupationService) { }
        
        ngOnInit(): void {
            this.LoadUserData();
            this.LoadItems();
        }
    
    UserInfoForm = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['',Validators.required],
        ocupationId:  ['',Validators.required],
        description:  ['',Validators.required],
        phone: ['',Validators.required],
        email:  ['',[Validators.required, Validators.email]],
        username:  ['',Validators.required],
        imageurl:  ['',Validators.required],
    })
    
    onFileSelected($event: Event) {
        throw new Error('Method not implemented.');
    }
    private SetUserCatching() {
        for (let item in this.user) {
            sessionStorage.setItem(item, this.user[item]);
        }
        sessionStorage.setItem("IsLoaded", "1");

    }
    private LoadUserData() {
        if (this.CheckIfCacheInfo()) {
            this.LoadUserInfoFromCaching();
            console.log(this.user.imageurl);

            return;
        };

        this.userInfo.GetUserInfoByRequest().subscribe({
            next: ({ userInfo }) => {
                this.user = {
                    ocupation: userInfo.ocupation,
                    description: userInfo.description,
                    ocupationId: userInfo.ocupationId,
                    firstname: userInfo.firstname,
                    lastname: userInfo.lastname,
                    imageurl: `data:image/png;base64, ${userInfo.image}`,
                    phone: userInfo.phone,
                    email: userInfo.email,
                    username: userInfo.username
                }
                this.SetUserCatching();

            },
            error: (value) => {

            }
        });



    }
    LoadUserInfoFromCaching() {
        for (let item in this.user) {
            let value = sessionStorage.getItem(item);
            this.user[item] = value === "null" || value === undefined ? "" : value;
        }
    }
    CheckIfCacheInfo(): boolean {
        const value = sessionStorage.getItem('IsLoaded');
        return (value === undefined || value === null ? false : true);

    }
    private LoadItems() {

        this.LoadOcupations();

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
    private LoadOcupations() {
        this.OcupationService.GetAllOcupations().subscribe(
            {
                next: ({ ocupations }) => {
                    this.Ocupations = [...ocupations],
                        this.Ocupation = {
                            ocupationId: Number(this.user.ocupationId),
                            description: this.user.ocupation
                        }
                },
                error: () => {

                }
            }

        );



    }

}
