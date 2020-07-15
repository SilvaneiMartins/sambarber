import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

class AddUserIdToAppointments1589512305048 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
        }))

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'AppointmentsUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'AppointmentUser')
        await queryRunner.dropColumn('appointments', 'user_id')
    }

}

export default AddUserIdToAppointments1589512305048
