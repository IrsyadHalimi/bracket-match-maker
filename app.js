function bracketApp() {
  return {
    teams: [], // List of team names
    bracket: [], // Generated bracket

    addTeam() {
      this.teams.push(''); // Add empty input for team
    },

    generateBracket() {
      // Check if number of teams is valid
      const validTeams = this.teams.filter(team => team.trim() !== '');
      const teamCount = validTeams.length;
      if (teamCount < 2 || (teamCount & (teamCount - 1)) !== 0) {
        alert('Number of teams must be a power of 2 (e.g., 4, 8, 16).');
        return;
      }

      // Generate initial matches
      this.bracket = [];
      for (let i = 0; i < validTeams.length; i += 2) {
        this.bracket.push([validTeams[i], validTeams[i + 1]]);
      }
    },

    resetBracket() {
      this.teams = [];
      this.bracket = [];
    }
  };
}
