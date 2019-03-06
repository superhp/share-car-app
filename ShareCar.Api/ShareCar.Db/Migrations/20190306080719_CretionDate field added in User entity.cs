using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ShareCar.Db.Migrations
{
    public partial class CretionDatefieldaddedinUserentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
        /*    migrationBuilder.DropForeignKey(
                name: "FK_RideRequests_Addresses_AddressId",
                table: "RideRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_RideRequests_AspNetUsers_DriverEmail",
                table: "RideRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_RideRequests_AspNetUsers_PassengerEmail",
                table: "RideRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_RideRequests_Rides_RideId",
                table: "RideRequests");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RideRequests",
                table: "RideRequests");

            migrationBuilder.RenameTable(
                name: "RideRequests",
                newName: "Requests");

            migrationBuilder.RenameIndex(
                name: "IX_RideRequests_RideId",
                table: "Requests",
                newName: "IX_Requests_RideId");

            migrationBuilder.RenameIndex(
                name: "IX_RideRequests_PassengerEmail",
                table: "Requests",
                newName: "IX_Requests_PassengerEmail");

            migrationBuilder.RenameIndex(
                name: "IX_RideRequests_DriverEmail",
                table: "Requests",
                newName: "IX_Requests_DriverEmail");

            migrationBuilder.RenameIndex(
                name: "IX_RideRequests_AddressId",
                table: "Requests",
                newName: "IX_Requests_AddressId");
            */
            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

          /*  migrationBuilder.AddPrimaryKey(
                name: "PK_Requests",
                table: "Requests",
                column: "RequestId");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Addresses_AddressId",
                table: "Requests",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "AddressId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_AspNetUsers_DriverEmail",
                table: "Requests",
                column: "DriverEmail",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_AspNetUsers_PassengerEmail",
                table: "Requests",
                column: "PassengerEmail",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Rides_RideId",
                table: "Requests",
                column: "RideId",
                principalTable: "Rides",
                principalColumn: "RideId",
                onDelete: ReferentialAction.Cascade);*/
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
      /*      migrationBuilder.DropForeignKey(
                name: "FK_Requests_Addresses_AddressId",
                table: "Requests");

            migrationBuilder.DropForeignKey(
                name: "FK_Requests_AspNetUsers_DriverEmail",
                table: "Requests");

            migrationBuilder.DropForeignKey(
                name: "FK_Requests_AspNetUsers_PassengerEmail",
                table: "Requests");

            migrationBuilder.DropForeignKey(
                name: "FK_Requests_Rides_RideId",
                table: "Requests");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Requests",
                table: "Requests");
                */
            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "AspNetUsers");
            /*
            migrationBuilder.RenameTable(
                name: "Requests",
                newName: "RideRequests");

            migrationBuilder.RenameIndex(
                name: "IX_Requests_RideId",
                table: "RideRequests",
                newName: "IX_RideRequests_RideId");

            migrationBuilder.RenameIndex(
                name: "IX_Requests_PassengerEmail",
                table: "RideRequests",
                newName: "IX_RideRequests_PassengerEmail");

            migrationBuilder.RenameIndex(
                name: "IX_Requests_DriverEmail",
                table: "RideRequests",
                newName: "IX_RideRequests_DriverEmail");

            migrationBuilder.RenameIndex(
                name: "IX_Requests_AddressId",
                table: "RideRequests",
                newName: "IX_RideRequests_AddressId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RideRequests",
                table: "RideRequests",
                column: "RequestId");

            migrationBuilder.AddForeignKey(
                name: "FK_RideRequests_Addresses_AddressId",
                table: "RideRequests",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "AddressId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RideRequests_AspNetUsers_DriverEmail",
                table: "RideRequests",
                column: "DriverEmail",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RideRequests_AspNetUsers_PassengerEmail",
                table: "RideRequests",
                column: "PassengerEmail",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RideRequests_Rides_RideId",
                table: "RideRequests",
                column: "RideId",
                principalTable: "Rides",
                principalColumn: "RideId",
                onDelete: ReferentialAction.Cascade);*/
        }
    }
}
