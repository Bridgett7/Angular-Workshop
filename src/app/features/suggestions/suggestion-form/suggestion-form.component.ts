import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SuggestionsService } from '../suggestions.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private suggestionsService: SuggestionsService
  ) {}

  ngOnInit(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Z][a-zA-Z ]*$')]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0]],
      status: ['en_attente']
    });
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const formValue = this.suggestionForm.value;
      const newSuggestion = {
        id: 0,
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        date: new Date(formValue.date),
        status: formValue.status,
        nbLikes: 0
      };
      this.suggestionsService.addSuggestion(newSuggestion);
      this.router.navigate(['/suggestions']);
    }
  }
}
