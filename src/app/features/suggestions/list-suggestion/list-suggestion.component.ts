import { Component } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionsService } from '../suggestions.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrl: './list-suggestion.component.css'
})
export class ListSuggestionComponent {
  favorites: Suggestion[] = [];
  searchTerm: string = '';

  suggestions: Suggestion[] = [];

  constructor(private suggestionsService: SuggestionsService) {
    this.suggestions = this.suggestionsService.getSuggestions();
  }

  get filteredSuggestions(): Suggestion[] {
    if (!this.searchTerm) {
      return this.suggestions;
    }
    const term = this.searchTerm.toLowerCase();
    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(term) ||
      s.category.toLowerCase().includes(term)
    );
  }

  like(suggestion: Suggestion): void {
    suggestion.nbLikes++;
  }

  addToFavorites(suggestion: Suggestion): void {
    if (!this.isFavorite(suggestion)) {
      this.favorites.push(suggestion);
    }
  }

  isFavorite(suggestion: Suggestion): boolean {
    return this.favorites.some(f => f.id === suggestion.id);
  }
}
