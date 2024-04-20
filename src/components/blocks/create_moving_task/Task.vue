<template>
    <div class="page-wrapper">
        <container class="moving-tasks" style="width: 100%;">
            <div>
                <el-row gutter="20">
                    <el-col :span="12">
                        ОТКУДА
                        <el-row>

                        </el-row>
                        </el-col>
                    <el-col :span="12">
                        КУДА
                        </el-col>
                </el-row>
            </div>
        </container>
    </div>
</template>

<script setup lang="ts">
import type { CreateMovingTask } from '../../../interfaces/moving_task'

const props = defineProps<{ task: CreateMovingTask }>()
</script>