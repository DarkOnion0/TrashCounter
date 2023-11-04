{
  description = "A little leptos app to track your trash";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

    flake-parts.url = "github:hercules-ci/flake-parts";

    treefmt-nix.url = "github:numtide/treefmt-nix";

    fenix = {
      url = "github:nix-community/fenix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    crane = {
      url = "github:ipetkov/crane";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = inputs @ {
    self,
    nixpkgs,
    flake-parts,
    fenix,
    crane,
    treefmt-nix,
    ...
  }:
    flake-parts.lib.mkFlake {inherit inputs;} {
      systems = ["x86_64-linux" "aarch64-linux"];
      imports = [
        inputs.treefmt-nix.flakeModule
      ];

      perSystem = {
        config,
        self',
        inputs',
        pkgs,
        system,
        lib,
        ...
      }: let
        Fenix = fenix.packages.${system};
        fenixChannel = "stable";
        fenixToolchain = Fenix.combine [
          Fenix.targets.wasm32-unknown-unknown.${fenixChannel}.rust-std
          Fenix.${fenixChannel}.rust-src
          Fenix.${fenixChannel}.cargo
          Fenix.${fenixChannel}.rust-analyzer
          Fenix.${fenixChannel}.rustfmt
          Fenix.${fenixChannel}.clippy
        ];

        craneLib =
          crane.lib.${system}.overrideToolchain fenixToolchain;
      in {
        devShells.default = pkgs.mkShell {
          shellHook = ''
            export RUST_BACKTRACE=1
          '';

          nativeBuildInputs = with pkgs; [
            # Nix
            alejandra
            nil

            # Rust
            fenixToolchain
          ];
        };

        treefmt.config = {
          projectRootFile = "flake.nix";
          programs = {
            prettier.enable = true;
            alejandra.enable = true;
            rustfmt = {
              enable = true;
              package = Fenix.${fenixChannel}.rustfmt;
            };
            leptosfmt.enable = true;
          };
        };

        apps = {
          trunk = {
            program =
              (pkgs.substituteAll
                {
                  inherit (pkgs) trunk;
                  isExecutable = true;
                  src = ./scripts/trunk.sh;
                })
              .outPath;
          };
          tailwind = {
            program =
              (pkgs.substituteAll
                {
                  inherit (pkgs.nodePackages) tailwindcss;
                  isExecutable = true;
                  src = ./scripts/tailwind.sh;
                })
              .outPath;
          };
        };
      };
    };
}
