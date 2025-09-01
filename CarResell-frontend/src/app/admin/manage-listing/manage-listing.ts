import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { FileUploadModule } from 'primeng/fileupload';  

@Component({
  selector: 'app-manage-listing',
  imports: [FormsModule, InputTextModule, TextareaModule],
  templateUrl: './manage-listing.html',
  styleUrl: './manage-listing.scss'
})
export class ManageListing {

  cName:string=""
  
}
