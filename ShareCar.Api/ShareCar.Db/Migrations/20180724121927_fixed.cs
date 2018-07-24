using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ShareCar.Db.Migrations
{
    public partial class @fixed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Passenger_People_Email",
                table: "Passenger");

            migrationBuilder.DropForeignKey(
                name: "FK_Passenger_Rides_RideId",
                table: "Passenger");

            migrationBuilder.DropForeignKey(
                name: "FK_Rides_People_PersonEmail",
                table: "Rides");

            migrationBuilder.DropIndex(
                name: "IX_Rides_PersonEmail",
                table: "Rides");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Passenger",
                table: "Passenger");

            migrationBuilder.DropColumn(
                name: "PersonEmail",
                table: "Rides");

            migrationBuilder.RenameTable(
                name: "Passenger",
                newName: "Passengers");

            migrationBuilder.RenameIndex(
                name: "IX_Passenger_RideId",
                table: "Passengers",
                newName: "IX_Passengers_RideId");

            migrationBuilder.AlterColumn<string>(
                name: "City",
                table: "Addresses",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Passengers",
                table: "Passengers",
                columns: new[] { "Email", "RideId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Passengers_People_Email",
                table: "Passengers",
                column: "Email",
                principalTable: "People",
                principalColumn: "Email",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Passengers_Rides_RideId",
                table: "Passengers",
                column: "RideId",
                principalTable: "Rides",
                principalColumn: "RideId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Passengers_People_Email",
                table: "Passengers");

            migrationBuilder.DropForeignKey(
                name: "FK_Passengers_Rides_RideId",
                table: "Passengers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Passengers",
                table: "Passengers");

            migrationBuilder.RenameTable(
                name: "Passengers",
                newName: "Passenger");

            migrationBuilder.RenameIndex(
                name: "IX_Passengers_RideId",
                table: "Passenger",
                newName: "IX_Passenger_RideId");

            migrationBuilder.AddColumn<string>(
                name: "PersonEmail",
                table: "Rides",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "City",
                table: "Addresses",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Passenger",
                table: "Passenger",
                columns: new[] { "Email", "RideId" });

            migrationBuilder.CreateIndex(
                name: "IX_Rides_PersonEmail",
                table: "Rides",
                column: "PersonEmail");

            migrationBuilder.AddForeignKey(
                name: "FK_Passenger_People_Email",
                table: "Passenger",
                column: "Email",
                principalTable: "People",
                principalColumn: "Email",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Passenger_Rides_RideId",
                table: "Passenger",
                column: "RideId",
                principalTable: "Rides",
                principalColumn: "RideId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rides_People_PersonEmail",
                table: "Rides",
                column: "PersonEmail",
                principalTable: "People",
                principalColumn: "Email",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
