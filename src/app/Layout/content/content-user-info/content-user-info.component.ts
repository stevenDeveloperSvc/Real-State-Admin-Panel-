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
  styleUrl: './content-user-info.component.scss',
})
export class ContentUserInfoComponent implements OnInit {
  IsDisabled: any;

  items!: MenuItem[] | null;
  Ocupations!: Ocupation[];
  Ocupation: Ocupation | undefined;
  value: any;

  UserInfoForm = this.formBuilder.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    ocupationId: [0, Validators.required],
    ocupation: [''],
    Description: ['', Validators.required],
    Phone: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    UserName: ['', Validators.required],
  });
  constructor(
    private messageService: MessageService,
    private userInfo: UserInfoService,
    private formBuilder: FormBuilder,
    private OcupationService: OcupationService
  ) {}
  async ngOnInit() {
    if (this.CheckIfCacheInfo()) {
      this.LoadUserInfoFromCaching();
      return;
    }
    this.LoadOcupations();
  await this.LoadUserData();
  }

  async submitUserInfo() {
    console.log(this.UserInfoForm.value);

    this.userInfo
      .UpdateUser(this.UserInfoForm.value as unknown as UserInfo)
      .subscribe( { 
        next:()=>{
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `User ${this.UserInfoForm.get('FirstName')?.value} info  has been Updated`,
          });
          this.LoadOcupations();
           this.LoadUserData();
        },
        error:(e)=>{
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: `An error happen, try again`,
          });
        }
      })
 
  }
  get FirstName() {
    return this.UserInfoForm.controls['FirstName'];
  }
  get LastName() {
    return this.UserInfoForm.controls['LastName'];
  }
  get UserName() {
    return this.UserInfoForm.controls['UserName'];
  }
  get Email() {
    return this.UserInfoForm.controls['Email'];
  }
  get Phone() {
    return this.UserInfoForm.controls['Phone'];
  }
  get Description() {
    return this.UserInfoForm.controls['Description'];
  }
  get OcupationId() {
    return this.UserInfoForm.controls['ocupationId'];
  }

  onFileSelected($event: Event) {
    throw new Error('Method not implemented.');
  }
  private SetUserCatching() {
    for (let item in this.UserInfoForm.controls) {
      if (item === 'ocupationId') {
        const Ocupation = {
          ...(this.UserInfoForm.get(item)?.value as unknown as Ocupation),
        };
        sessionStorage.setItem(item, JSON.stringify(Ocupation));
        continue;
      }
      sessionStorage.setItem(item, this.UserInfoForm.get(item)?.value);
    }
    sessionStorage.setItem('ocupations', JSON.stringify(this.Ocupations));
    sessionStorage.setItem('IsLoaded', '1');
  }
  private async LoadUserData() {
  

    await this.userInfo.GetUserInfoByRequestPromise().then(({ userInfo }) => {
      this.UserInfoForm.patchValue({
        FirstName: userInfo.firstname,
        LastName: userInfo.lastname,
        UserName: userInfo.username,
        ocupationId: userInfo.ocupationId as number | undefined,
        ocupation :userInfo.ocupation,
        Phone: userInfo.phone,
        Email: userInfo.email,
        Description: userInfo.description,
      });
      const Ocupation: any = {
        ocupationId: Number(this.UserInfoForm.get('ocupationId')?.value),
        description: this.UserInfoForm.get("ocupation")?.value
      };
      this.UserInfoForm.get('ocupationId')?.patchValue(Ocupation);

      this.SetUserCatching();
    });
  }
  LoadUserInfoFromCaching() {
    for (let item in this.UserInfoForm.value) {
      let value = sessionStorage.getItem(item);
      if (item === 'ocupations') continue;
      if (item === 'ocupationId') {
        this.UserInfoForm.get(item)?.patchValue(JSON.parse(value as any));
        continue;
      }
      this.UserInfoForm.get(item)?.patchValue(
        this.IsNullOrEmpty(value) ? '' : value
      );
    }
    const value = sessionStorage.getItem("ocupations")
    this.Ocupations = JSON.parse(value as string)
  }
  IsNullOrEmpty(value: string | null): any {
    return value === null || value === 'null' || value.length === 0;
  }
  CheckIfCacheInfo(): boolean {
    const value = sessionStorage.getItem('IsLoaded');
    return value === undefined || value === null ? false : true;
  }

  private LoadOcupations() {
    this.OcupationService.GetAllOcupations().subscribe({
      next: ({ ocupations }) => {
        this.Ocupations = [...ocupations];
      },
      error: () => {},
    });
  }
}
