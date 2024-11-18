function bracketApp() {
  return {
    teams: [], // List of team names
    logos: [], // List of team logos
    bracket: [], // Generated bracket
    isGenerated: false, // Flag to track if bracket has been generated

    init() {
      const savedData = JSON.parse(localStorage.getItem('bracketData'));
      if (savedData) {
        this.teams = savedData.teams || [];
        this.logos = savedData.logos || [];
        this.bracket = savedData.bracket || [];
        this.isGenerated = savedData.isGenerated || false;
      }
    },

    saveToLocalStorage() {
      const data = {
        teams: this.teams,
        logos: this.logos,
        bracket: this.bracket,
        isGenerated: this.isGenerated,
      };
      localStorage.setItem('bracketData', JSON.stringify(data));
    },

    addTeam() {
      this.teams.push(''); // Add empty input for team
      this.logos.push(''); // Add empty slot for logo
      this.saveToLocalStorage();
    },

    handleLogoUpload(index, event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.logos[index] = e.target.result; // Save image as Base64
          this.saveToLocalStorage();
        };
        reader.readAsDataURL(file);
      }
    },

    shuffleTeams(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },

    generateBracket() {
      const validTeams = this.teams.filter(team => team.trim() !== '');
      const teamCount = validTeams.length;

      if (teamCount < 2) {
        alert('Number of teams must be at least 2 (two)!');
        return;
      }

      const shuffledTeams = this.shuffleTeams(
        validTeams.map((team, index) => ({ team, logo: this.logos[index] }))
      );
      

      this.bracket = [];
      for (let i = 0; i < shuffledTeams.length; i += 2) {
        this.bracket.push([shuffledTeams[i], shuffledTeams[i + 1]]);
      }

      this.isGenerated = true;
      this.saveToLocalStorage();
    },

    resetBracket() {
      this.teams = [];
      this.logos = [];
      this.bracket = [];
      this.isGenerated = false;
      localStorage.removeItem('bracketData');
    }
  };
}
