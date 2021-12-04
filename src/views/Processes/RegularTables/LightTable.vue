<template>
    <b-card no-body>
        <b-card-header class="border-0">
            <h3 class="mb-0">Processes</h3>
        </b-card-header>

        <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :data="projects">
            <el-table-column label="Name"
                             min-width="350px"
                             prop="name">
                <template v-slot="{row}">
                    <b-media no-body class="align-items-center">
                        <a href="#" class="avatar rounded-circle mr-3">
                            <img alt="Image placeholder" :src="row.img">
                        </a>
                        <b-media-body>
                            <span class="font-weight-600 name mb-0 text-sm">{{row.title}}</span>
                        </b-media-body>
                    </b-media>
                </template>
            </el-table-column>

            <el-table-column label="Description"
                             prop="description"
                             min-width="340px">
            </el-table-column>

            <el-table-column label="Status"
                             min-width="140px"
                             prop="status">
                <template v-slot="{row}">
                    <badge class="badge-dot mr-4" type="">
                        <i :class="`bg-${row.statusType}`"></i>
                        <span class="status" :class="`text-${row.statusType}`">{{row.status}}</span>
                    </badge>
                </template>
            </el-table-column>

            <el-table-column label="Instance count"
                             min-width="130px"
                             prop="instanceCount">
                <template v-slot="{row}">
                    <badge class="badge-dot mr-4" type="">
                        <span class="status text-success">{{row.instanceCount}}</span>
                    </badge>
                </template>
            </el-table-column>

            <el-table-column label="Incidents"
                             min-width="140px"
                             prop="incidentsCount">
                <template v-slot="{row}">
                    <badge class="badge-dot mr-4" type="">
                        <span class="status text-danger">{{row.incidentsCount}}</span>
                    </badge>
                </template>
            </el-table-column>

            <el-table-column label="Avg.Exec. time"
                             min-width="160px"
                             prop="averageExecutionTime">
                <template v-slot="{row}">
                    <badge class="badge-dot mr-4" type="">
                        <span class="status text-danger">{{row.averageExecutionTime}} mins</span>
                    </badge>
                </template>
            </el-table-column>

            <el-table-column label="Completion"
                             prop="completion"
                             min-width="240px">
                <template v-slot="{row}">
                    <div class="d-flex align-items-center">
                        <span class="completion mr-2">{{row.completion}}%</span>
                        <div>
                            <base-progress :type="row.statusType" :value="row.completion"/>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <b-card-footer class="py-4 d-flex justify-content-end">
            <base-pagination v-model="currentPage" :per-page="10" :total="50"></base-pagination>
        </b-card-footer>
    </b-card>
</template>
<script>
  import projects from './../projects'
  import { Table, TableColumn} from 'element-ui'
  export default {
    name: 'light-table',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data() {
      return {
        projects,
        currentPage: 1
      };
    }
  }
</script>
