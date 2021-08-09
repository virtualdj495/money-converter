import { NgModule } from '@angular/core';

import { MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule} from '@angular/material/icon';

const MaterialComponents = [
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule
]

@NgModule({
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }
