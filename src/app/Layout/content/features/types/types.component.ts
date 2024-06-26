import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Type } from '@interface/Content';
import { TypesService } from '@services/types.service';
import { MessageService } from 'primeng/api';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';
import {
  TableLazyLoadEvent,
  TableModule,
  TableRowSelectEvent,
} from 'primeng/table';

@Component({
  selector: 'app-types',
  standalone: true,
  imports: [
    TableModule,
    ConfirmDialogModule,
    SkeletonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './types.component.html',
  styleUrl: './types.component.scss',
})
export class TypesComponent implements OnInit {
  TotalPages!: number;
  Data!: Type[];
  Value: Type ={
    description:'',
    id: 0
  }
  IsEditing: boolean = false;
  IsLoading : boolean = false;
  any: any;

  constructor(private Types: TypesService, private message: MessageService) {}

  SaveTypes() {
    const TypeObject = this.CreateTypeObjet();
    if(this.IsEditing){
      this.Update(TypeObject)
    }else{
      this.Save(TypeObject);
    }

  }
  ClearTypes() {
    this.Value.description = '';
  }
  Update(TypeObject: Type) {
    this.Types.ModifyType(TypeObject).subscribe({
      next:(value)=>{
        this.message.add({
          detail:value.value,
          summary:'success',
          severity:'success'
        })
        this.ClearTypes();
        this.LoadInfo();
        this.IsEditing = false;
      },
      error:()=>{
        this.message.add({
          detail:'Error while trying to save',
          summary:'error',
          severity:'error'
        })
        this.ClearTypes();
        this.LoadInfo();
        this.IsEditing = false;
      }
    })  
  }
  Save(TypeObject : Type) {
    this.Types.AddAType(TypeObject).subscribe({
      next:(value)=>{
        this.message.add({
          detail:value.value,
          summary:'success',
          severity:'success'
        })
        this.ClearTypes();
        this.LoadInfo();
        this.IsEditing = false;
      },
      error:(e)=>{
        this.message.add({
          detail:'Error while trying to save',
          summary:'error',
          severity:'error'
        })
        this.ClearTypes();
        this.LoadInfo();
        this.IsEditing = false;
      }
    })  }
  CreateTypeObjet() : Type{
    const data = {...this.Value};
    data.description = this.Value.description;
    return data;
  }
  ngOnInit(): void {
  this.LoadInfo()
  }
  LoadInfo() {
    this.IsLoading = true;
    this.Types.GetAllTypes().subscribe({
      next: (data) => {
        this.Data = data.types;
        this.TotalPages = data.countItems as number;

        this.IsLoading = false;
        this.message.add({
          detail: data.response.value,
          summary: 'success',
          severity: 'success',
        });
      },
      error: () => {
        this.message.add({
          detail: 'Error while trying to get types',
          summary: 'error',
          severity: 'error',
        });
      },
    });  }
  confirmDeleteProperty(e: any) {
    throw new Error('Method not implemented.');
  }
  editProperty(e: Type) {
    this.IsEditing= true;
    this.Value = {...e};
  }
  onRowSelect(e: TableRowSelectEvent) {
  }
  loadProperties(e: any) {
    const page = e.first / e.rows + 1;
    this.Types.GetAllTypes(page).subscribe({
      next: (data) => {
        this.Data = data.types;
        this.TotalPages = data.countItems as number;
        this.IsLoading = false;
      },
      error: () => {
        this.message.add({
          detail: 'Error while trying to get types',
          summary: 'error',
          severity: 'error',
        });
      },
    })
    // throw new Error('Method not implemented.');
  }
}
