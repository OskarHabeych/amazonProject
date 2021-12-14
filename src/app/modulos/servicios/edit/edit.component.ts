import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioModelo } from 'src/app/modelos/servicio.model';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { ClienteModelo } from 'src/app/modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { EncomiendaModelo } from 'src/app/modelos/encomienda.model';
import { EncomiendaService } from 'src/app/servicios/encomienda.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private servicioService: ServiciosService,
    private clienteService: ClienteService,
    private encomiendaService: EncomiendaService,
    private router: Router,
    private route: ActivatedRoute)
   { 

  }

  listadoClientes: ClienteModelo[] = []
  listadoEncomienda: EncomiendaModelo[] = []

  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
    hora: ['', [Validators.required]],
    valor: ['', [Validators.required, Validators.minLength(4)]],
    origen: ['', [Validators.required]],
    destino: ['', [Validators.required]],
    encomienda: ['', [Validators.required]],
  });

  id: string=''

  buscarRegistro(id: string){
    this.servicioService.getWithId(id).subscribe((data: ServicioModelo) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["fecha"].setValue(data.fecha)
      this.fgValidacion.controls["hora"].setValue(data.hora)
      this.fgValidacion.controls["valor"].setValue(data.valor)
      this.fgValidacion.controls["origen"].setValue(data.origen)
      this.fgValidacion.controls["destino"].setValue(data.destino)
      this.fgValidacion.controls["encomienda"].setValue(data.encomienda)
    })
  }

  edit(){
    let servicio = new ServicioModelo();
    servicio.id = this.fgValidacion.controls["id"].value;
    servicio.fecha = this.fgValidacion.controls["fecha"].value;
    servicio.hora = this.fgValidacion.controls["hora"].value;
    servicio.valor = this.fgValidacion.controls["valor"].value;
    servicio.origen = this.fgValidacion.controls["origen"].value;
    servicio.destino = this.fgValidacion.controls["destino"].value;
    servicio.encomienda = this.fgValidacion.controls["encomienda"].value;
 
    this.servicioService.update(servicio).subscribe((data: ServicioModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/servicios/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

  getAllClientes(){
    this.clienteService.getAll().subscribe((data: ClienteModelo[]) => {
      this.listadoClientes = data
      console.log(data)
      
    })
  }

  getAllEncomiendas(){
    this.encomiendaService.getAll().subscribe((data: EncomiendaModelo[]) => {
      this.listadoEncomienda = data
      console.log(data)
    })
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }

}