import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-field-error-display',
  templateUrl: './app-field-error-display.component.html',
  styleUrls: ['./app-field-error-display.component.scss']
})
export class AppFieldErrorDisplayComponent implements OnInit {
	@Input() errorMsg: string;
	@Input() displayError: boolean;
	form: FormGroup;

  constructor(public formBuilder:FormBuilder) { }

  ngOnInit() {
  	console.log(this.displayError);
  }

}
