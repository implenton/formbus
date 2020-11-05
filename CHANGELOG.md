# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased
### Added
- Add GitHub Action to publish on npm

## [0.4.2] - 2020-11-03
### Added
- GitHub action for ESlint
- Description in the package file

### Fixed
- Readme typos
- Unexpected trailing comma
- Wrong licence in package file

### Changed
- Exclude `package-lock.json` file from repo

## [0.4.1] - 2020-10-29
### Added
- Linking the video demoing it with Contact Form 7

### Fixed
- Previous changelog entry date

## [0.4.0] - 2020-10-29
### Added
- Introduce `form-state-class` and `form-state-message` directive

### Changed
- Switch licence to MIT
- Simplify request config object

## [0.3.1] - 2020-10-26
### Added
- First draft of complete readme

## [0.3.0] - 2020-10-25
### Added
- Contact Form 7 as service implementation

## [0.2.0] - 2020-10-24
### Added
- Directives implementation
- `beforeFormBusRequest` custom event
- Changelog file

### Changed
- `formBusResponse` custom event renamed to `afterFormBusResponse`

### Fixed
- Gravity Forms' form submission error now returns false when there are fields with a validation error

## [0.1.1] - 2020-10-23
### Changed
- IntelliJ IDEA config folder added to the `.gitignore`

## [0.1.0] - 2020-10-23
### Added
- Core functionality with Gravity Forms implementation
- ESLint shortcut scripts in the package.json

