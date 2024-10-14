import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // Asegúrate de esta importación

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.css']
})
export class CorreoComponent {
  emailForm: FormGroup;
  public Editor = ClassicEditor;

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      body: ['', Validators.required],
    });
  }
  public onReady(editor: any) {
    // Aquí no se configura ningún adaptador de carga
  }
  onSubmit() {
    if (this.emailForm.valid) {
      console.log(this.emailForm.value);
    }
  }

  public editorConfig = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote',
      '|',
      'undo',
      'redo',
      // Sin botones de imagen
    ],
    removePlugins: ['ImageUpload'], // Deshabilitar el plugin de carga de imágenes
  };
}
