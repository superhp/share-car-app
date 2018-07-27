using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ShareCar.Db.Migrations
{
    public partial class UpdatedRequestsAndRidesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_Rides_RideId",
                table: "Requests");


            migrationBuilder.AlterColumn<int>(
                name: "RideId",
                table: "Requests",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "SeenByDriver",
                table: "Requests",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "SeenByPassenger",
                table: "Requests",
                nullable: false,
                defaultValue: false);


            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Rides_RideId",
                table: "Requests",
                column: "RideId",
                principalTable: "Rides",
                principalColumn: "RideId",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Passengers_AspNetUsers_Email",
                table: "Passengers");

            migrationBuilder.DropForeignKey(
                name: "FK_Requests_Rides_RideId",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "SeenByDriver",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "SeenByPassenger",
                table: "Requests");

            migrationBuilder.AlterColumn<int>(
                name: "RideId",
                table: "Requests",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Passengers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Passengers_UserId",
                table: "Passengers",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Passengers_AspNetUsers_UserId",
                table: "Passengers",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Rides_RideId",
                table: "Requests",
                column: "RideId",
                principalTable: "Rides",
                principalColumn: "RideId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
