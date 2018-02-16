import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  signForm: FormGroup
  genders = ['Male','Female']
  forbiddenUsername = ['neha','pooja'];
  ngOnInit()
  {
    this.signForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null,[Validators.required ,this.validUsername.bind(this)]),
        'email': new FormControl(null,[Validators.required,Validators.email],this.validEmail)
      }),

      'gender': new FormControl('Male'),
      'hobbies': new FormArray([])
    })

    this.signForm.setValue(
      {
        'userData':{
          'username' : 'priti',
          'email' : 'connect2priti@gmail.com'
        },
        'gender' : 'Female',
        'hobbies' : []
      }
    )

    this.signForm.patchValue(
      {
        'userData' :{
          'username' : 'Maurya Priti'
        }
      }
    )
  }
  onSubmit()
  {
    console.log(this.signForm);
    this.signForm.reset()
  }

  onAdd()
  {
    const control = new FormControl(null);
    (<FormArray>this.signForm.get('hobbies')).push(control)
  }

  //custom validator
  validUsername(control: FormControl):{[s: string]:boolean}
  {
    if(this.forbiddenUsername.indexOf(control.value) !== -1)
    {
      return {s:true};
    }
    return null;
  }
  //asyn validator

  validEmail(control: FormControl): Promise<any>
  {
    const promise = new Promise(
      (resolve,reject)=>{
        setTimeout(()=>{
          if(control.value == 'test@test.com')
          {
            resolve({'emailForbidden': true})
          }
          else
          {
            resolve(null)
          }
        },1500)
      }
    )
    return promise;
  }
}
