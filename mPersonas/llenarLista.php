				            <div class="table-responsive">
				                <table id="example1" class="table table-condensed table-bordered table-striped">

				                    <thead align="center">
				                      <tr class="info" >
				                        <th>#</th>
				                        <th>Nombre</th>
				                        <th>Correo</th>
				                        <th>Telefono</th>
				                        <th>Genero</th>
				                        <th>Editar</th>
				                        <th>Estatus</th>
				                      </tr>
				                    </thead>

				                    <tbody align="center">
				                    <?php 
				                    $n=1;
				                    while ($n <= 11) {
				                      $num1=rand(0,100);
				                      $num2=rand(0,100);
				                      ?>
				                      <tr>
				                        <td>
				                          <p>
				                          	<?php echo "$n"; ?>
				                          </p>
				                        </td>
				                        <td>
				                          <p>
				                          	Pablo Adrian Perez Briseño
				                          </p>
				                        </td>
				                        <td>
				                          <p>
				                          	genaro_ibanez@hotmail.com
				                          </p>
				                        </td>
				                        <td>
				                          <p>
				                          	8261234567
				                          </p>
				                        </td>
				                        <td>
				                          <p>
				                          	Masculino
				                          </p>	
				                        <td>
				                          <button type="button" class="btn btn-login btn-sm" >
				                          	<i class="far fa-edit"></i>
				                          </button>
				                        </td>
				                        <td>
											<input  data-size="small" data-style="android" value="<?php echo "$valor"; ?>" type="checkbox" <?php echo "$checado"; ?>  id="<?php echo "interruptor".$n; ?>"  data-toggle="toggle" data-on="Desactivar" data-off="Activar" data-onstyle="danger" data-offstyle="success" class="interruptor" data-width="100" onchange="status(this.value,<?php echo $n; ?>,<?php echo $idTablaPrincipal; ?>,'<?php echo $nombre; ?>');">
				                        </td>
				                      </tr>
				                      <?php
				                      $n++;
				                    }
				                     ?>

				                    </tbody>

				                    <tfoot align="center">
				                      <tr class="info">
				                        <th>#</th>
				                        <th>Nombre</th>
				                        <th>Correo</th>
				                        <th>Telefono</th>
				                        <th>Genero</th>
				                        <th>Editar</th>
				                        <th>Estatus</th>
				                      </tr>
				                    </tfoot>

				                </table>
				            </div>

      <script type="text/javascript">
        $(document).ready(function() {
              $('#example1').DataTable( {
                 "language": {
                         // "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                          "url": "../plugins/datatables/langauge/Spanish.json"
                      },
                 "order": [[ 0, "asc" ]],
                 "paging":   true,
                 "ordering": true,
                 "info":     true,
                 "responsive": true,
                 "searching": true,
                 stateSave: false,
                  dom: 'Bfrtip',
                  lengthMenu: [
                      [ 10, 25, 50, -1 ],
                      [ '10 Registros', '25 Registros', '50 Registros', 'Todos' ],
                  ],
                 columnDefs: [ {
                      // targets: 0,
                      // visible: false
                  }],
                  buttons: [
                            {
                                extend: 'pageLength',
                                text: 'Registros',
                                className: 'btn btn-default'
                            },
                          {
                              extend: 'excel',
                              text: 'Exportar a Excel',
                              className: 'btn btn-default',
                              title:'Bajas-Estaditicas',
                              exportOptions: {
                                  columns: ':visible'
                              }
                          },
                         {
                              text: 'Nueva Persona',
                              action: function (  ) {
                                      nuevoRegistro();
                              },
                              counter: 1
                          },
                  ]
              } );
          } );

      </script>
      <script>
            $(".interruptor").bootstrapToggle('destroy');
            $(".interruptor").bootstrapToggle();
      </script>
    
    
