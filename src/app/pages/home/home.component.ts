import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interface/usuario';
import { PersonaService } from 'src/app/services/persona.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  formulario !:  FormGroup;

  persona: any[]=[];

  constructor(private dataService: PersonaService){
    this.formulario = new FormGroup({
      nombreControl: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      apellidoControl: new FormControl('', [Validators.required, Validators.minLength(5),]),
      emailControl: new FormControl('', [Validators.required, Validators.email]),
      websiteControl: new FormControl('', [Validators.required]),
    })
  }

  

  ngOnInit(): void {
    this.dataService.getPersona().subscribe(res => {
      this.persona = res;
    })
  }
 
  registrar() {
    if(this.formulario.valid){
      swal.fire({
        icon: 'success',
        title: 'Usuario Registrado Exitosamente',
        showConfirmButton: false,
        timer: 1500
      })

      console.log(this.formulario.value);
      const response = this.dataService.addPersona(this.formulario.value);
      console.log(response)

      this.formulario.reset();
    }else{
      swal.fire({
        icon: 'error',
        title: 'No se registro ',
        text: 'Intentelo de nuevo',
        showConfirmButton: false,
        timer: 1500
      })

      
    }
  }


  onClickDelete(persona: Usuario) {
    const response = this.dataService.deletedPersona(persona)
    console.log(response)
    swal.fire({
      icon: 'success',
      title: 'Usuario Eliminado Correctamente',
      showConfirmButton: false,
      timer: 1500
    })
  }


}
