import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router) {
     }

    fgValidacion = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.minLength(6)]],
      correo: ['', [Validators.required, Validators.email]],
    });
  

  ngOnInit(): void {
  }

  store(){
    let cliente = new ClienteModelo();
    cliente.nombre = this.fgValidacion.controls["nombre"].value;
    cliente.apellidos = this.fgValidacion.controls["apellidos"].value;
    cliente.cedula = this.fgValidacion.controls["cedula"].value;
    cliente.pais = this.fgValidacion.controls["pais"].value;
    cliente.ciudad = this.fgValidacion.controls["ciudad"].value;
    cliente.departamento  = this.fgValidacion.controls["departamento "].value;
    cliente.direccion = this.fgValidacion.controls["direccion"].value;
    cliente.telefono = this.fgValidacion.controls["telefono"].value;
    cliente.email = this.fgValidacion.controls["email"].value;
    
 
    this.clienteService.store(cliente).subscribe((data: ClienteModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/cliente/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
