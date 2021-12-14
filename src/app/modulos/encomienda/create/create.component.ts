import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncomiendaModelo } from 'src/app/modelos/encomienda.model';
import { EncomiendaService } from 'src/app/servicios/encomienda.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private encomiendaService: EncomiendaService,
    private router: Router) {
     }

    fgValidacion = this.fb.group({
      descripcion: ['', [Validators.required, Validators.minLength(6)]],
      peso: ['', [Validators.required]],
      presentacion: ['', [Validators.required, Validators.minLength(4)]],
    });
  
  ngOnInit(): void {
  }

  store(){
    let encomienda = new EncomiendaModelo();
    encomienda.descripcion = this.fgValidacion.controls["descripcion"].value;
    encomienda.peso = this.fgValidacion.controls["peso"].value;
    encomienda.presentacion = this.fgValidacion.controls["presentacion"].value;
 
    this.encomiendaService.store(encomienda).subscribe((data: EncomiendaModelo)=> {
      Swal.fire('Creada correctamente!', '', 'success')
      this.router.navigate(['/encomienda/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
