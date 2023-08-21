import {Component} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html',
  styleUrls: ['./form-example.component.css']
})
export class FormExampleComponent {
  form: FormGroup = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), passwordStrengthValidator]],
      songs: this.fb.array([], minSongsValidator)
    }
  )

  constructor(private fb: FormBuilder) {
  }

  handleSubmit() {
    console.log(this.form.controls);
    if (this.form.valid) {
      console.log('Form data submitted:', this.form.value);

    } else {
      console.log('Form data is invalid');
    }
  }

  handleReset() {
    this.form.reset();
  }

  get songFormArray() {
    return this.form.get('songs') as FormArray;
  }

  addItem() {
    const newItemGroup = this.fb.group({
      songName: ['', Validators.required],
      songDescription: ['']
    });

    this.songFormArray.push(newItemGroup);
  }

  removeItem(index: number) {
    this.songFormArray.removeAt(index);
  }


}

function passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value;
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/.test(value)) {
    return {'passwordStrength': true};
  }
  return null;
}

function minSongsValidator(control: AbstractControl): ValidationErrors | null {
  const songsArray = control.value as any[]; // Cast value to an array

  if (songsArray.length < 2) {
    return {'minSongs': true};
  }

  return null;
}



