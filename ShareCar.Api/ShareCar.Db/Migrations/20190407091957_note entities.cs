using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ShareCar.Db.Migrations
{
    public partial class noteentities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PassengerId",
                table: "Passengers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "DriverNotes",
                columns: table => new
                {
                    DriverNoteId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DriverEmail = table.Column<string>(nullable: true),
                    Text = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DriverNotes", x => x.DriverNoteId);
                    table.ForeignKey(
                        name: "FK_DriverNotes_AspNetUsers_DriverEmail",
                        column: x => x.DriverEmail,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RideRequestNotes",
                columns: table => new
                {
                    RideRequestNoteId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Email = table.Column<string>(nullable: true),
                    RideId = table.Column<int>(nullable: false),
                    Text = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RideRequestNotes", x => x.RideRequestNoteId);
                    table.ForeignKey(
                        name: "FK_RideRequestNotes_Rides_RideId",
                        column: x => x.RideId,
                        principalTable: "Rides",
                        principalColumn: "RideId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RideRequestNotes_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DriverSeenNotes",
                columns: table => new
                {
                    DriverSeenNoteId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DriverNoteId = table.Column<int>(nullable: false),
                    PassengerEmail = table.Column<string>(nullable: true),
                    PassengerId = table.Column<int>(nullable: false),
                    PassengerRideId = table.Column<int>(nullable: true),
                    Seen = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DriverSeenNotes", x => x.DriverSeenNoteId);
                    table.ForeignKey(
                        name: "FK_DriverSeenNotes_DriverNotes_DriverNoteId",
                        column: x => x.DriverNoteId,
                        principalTable: "DriverNotes",
                        principalColumn: "DriverNoteId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DriverSeenNotes_Passengers_PassengerEmail_PassengerRideId",
                        columns: x => new { x.PassengerEmail, x.PassengerRideId },
                        principalTable: "Passengers",
                        principalColumns: new[] { "Email", "RideId" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DriverNotes_DriverEmail",
                table: "DriverNotes",
                column: "DriverEmail");

            migrationBuilder.CreateIndex(
                name: "IX_DriverSeenNotes_DriverNoteId",
                table: "DriverSeenNotes",
                column: "DriverNoteId");

            migrationBuilder.CreateIndex(
                name: "IX_DriverSeenNotes_PassengerEmail_PassengerRideId",
                table: "DriverSeenNotes",
                columns: new[] { "PassengerEmail", "PassengerRideId" });

            migrationBuilder.CreateIndex(
                name: "IX_RideRequestNotes_RideId",
                table: "RideRequestNotes",
                column: "RideId");

            migrationBuilder.CreateIndex(
                name: "IX_RideRequestNotes_UserId",
                table: "RideRequestNotes",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DriverSeenNotes");

            migrationBuilder.DropTable(
                name: "RideRequestNotes");

            migrationBuilder.DropTable(
                name: "DriverNotes");

            migrationBuilder.DropColumn(
                name: "PassengerId",
                table: "Passengers");
        }
    }
}
