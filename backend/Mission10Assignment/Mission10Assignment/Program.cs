using Microsoft.Data.Sqlite;

var builder = WebApplication.CreateBuilder(args);

// Allow the React dev server to call this API during local development.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors();

// Return the bowlers required by the assignment.
app.MapGet("/api/bowlers", () =>
{
    // Build a safe absolute path to the SQLite database file.
    var dbPath = Path.Combine(app.Environment.ContentRootPath, "Data", "BowlingLeague.sqlite");

    if (!File.Exists(dbPath))
    {
        return Results.NotFound(new { message = "BowlingLeague.sqlite not found in Data folder." });
    }

    var bowlers = new List<BowlerDto>();

    using var connection = new SqliteConnection($"Data Source={dbPath}");
    connection.Open();

    const string sql = @"
        SELECT
            b.BowlerID,
            b.BowlerFirstName,
            b.BowlerMiddleInit,
            b.BowlerLastName,
            t.TeamName,
            b.BowlerAddress,
            b.BowlerCity,
            b.BowlerState,
            b.BowlerZip,
            b.BowlerPhoneNumber
        FROM Bowlers b
        JOIN Teams t ON b.TeamID = t.TeamID
        WHERE t.TeamName IN ($teamOne, $teamTwo)
        ORDER BY t.TeamName, b.BowlerLastName, b.BowlerFirstName;";

    using var command = connection.CreateCommand();
    command.CommandText = sql;
    // Use parameters so values are not hard-coded into SQL text.
    command.Parameters.AddWithValue("$teamOne", "Marlins");
    command.Parameters.AddWithValue("$teamTwo", "Sharks");

    using var reader = command.ExecuteReader();
    // Convert each DB row into a response object for the frontend.
    while (reader.Read())
    {
        bowlers.Add(new BowlerDto(
            reader.GetInt32(0),
            reader.GetString(1),
            reader.IsDBNull(2) ? null : reader.GetString(2),
            reader.GetString(3),
            reader.GetString(4),
            reader.GetString(5),
            reader.GetString(6),
            reader.GetString(7),
            reader.GetString(8),
            reader.GetString(9)
        ));
    }

    return Results.Ok(bowlers);
});

app.Run();

// Shape of the JSON object returned by /api/bowlers.
record BowlerDto(
    int BowlerID,
    string BowlerFirstName,
    string? BowlerMiddleInit,
    string BowlerLastName,
    string TeamName,
    string BowlerAddress,
    string BowlerCity,
    string BowlerState,
    string BowlerZip,
    string BowlerPhoneNumber
);
