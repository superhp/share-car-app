using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ShareCar.Db.Migrations
{
    public partial class ChangedPassengerPrimaryKeyToID : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "isActive",
                table: "Rides",
                nullable: true,
                defaultValue: true,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<int>(
                name: "NumberOfSeats",
                table: "Rides",
                nullable: true,
                defaultValue: 4,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "PassengerId",
                table: "Passengers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Passengers_PassengerId",
                table: "Passengers",
                column: "PassengerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_Passengers_PassengerId",
                table: "Passengers");

            migrationBuilder.DropColumn(
                name: "PassengerId",
                table: "Passengers");

            migrationBuilder.AlterColumn<bool>(
                name: "isActive",
                table: "Rides",
                nullable: false,
                oldClrType: typeof(bool),
                oldDefaultValue: true);

            migrationBuilder.AlterColumn<int>(
                name: "NumberOfSeats",
                table: "Rides",
                nullable: false,
                oldClrType: typeof(int),
                oldDefaultValue: 4);
        }
    }
}
